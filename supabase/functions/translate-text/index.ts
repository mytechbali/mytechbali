// Edge function: translates a single source string into all supported languages
// via the Lovable AI Gateway, then upserts each translation row into
// public.site_translations using the service role key (bypasses RLS).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const LANG_NAMES: Record<string, string> = {
  en: "English",
  id: "Indonesian",
  ja: "Japanese",
  zh: "Simplified Chinese",
  de: "German",
  fr: "French",
  ru: "Russian",
  ko: "Korean",
};

const ALL_LANGS = Object.keys(LANG_NAMES);

interface Body {
  key: string;
  sourceLang: string;
  sourceText: string;
  targets?: string[];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { key, sourceLang, sourceText, targets }: Body = await req.json();

    if (!key || !sourceLang || typeof sourceText !== "string") {
      return new Response(
        JSON.stringify({ error: "key, sourceLang and sourceText are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    const targetLangs = (targets && targets.length ? targets : ALL_LANGS).filter(
      (l) => l !== sourceLang && LANG_NAMES[l],
    );

    const translations: Record<string, string> = {
      [sourceLang]: sourceText,
    };

    // Short-circuit: empty string — save the same in every language.
    if (sourceText.trim() === "") {
      for (const l of targetLangs) translations[l] = "";
    } else {
      // Ask the model to return JSON with every target language.
      const langList = targetLangs
        .map((l) => `${l} (${LANG_NAMES[l]})`)
        .join(", ");

      const systemPrompt =
        "You are a professional translator for a computer repair service website in Bali, Indonesia. " +
        "Translate the source text naturally and concisely. Preserve leading/trailing spaces exactly as in the source. " +
        "Do NOT add explanations, quotes, or extra punctuation. Keep brand names (e.g. 'My Tech Bali') untranslated.";

      const userPrompt =
        `Source language: ${LANG_NAMES[sourceLang] ?? sourceLang}\n` +
        `Source text: """${sourceText}"""\n\n` +
        `Translate into these languages: ${langList}.\n` +
        `Return ONLY a JSON object with language codes as keys and translations as values. ` +
        `Example: {"id":"...","ja":"..."}`;

      const aiResp = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
          }),
        },
      );

      if (!aiResp.ok) {
        const txt = await aiResp.text();
        if (aiResp.status === 429) {
          return new Response(
            JSON.stringify({ error: "Rate limit exceeded, please try again shortly." }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }
        if (aiResp.status === 402) {
          return new Response(
            JSON.stringify({ error: "AI credits exhausted. Add credits in Lovable workspace settings." }),
            { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }
        console.error("AI gateway error", aiResp.status, txt);
        return new Response(
          JSON.stringify({ error: "Translation failed" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      const aiJson = await aiResp.json();
      const content: string = aiJson.choices?.[0]?.message?.content ?? "{}";
      let parsed: Record<string, string> = {};
      try {
        parsed = JSON.parse(content);
      } catch {
        // Attempt to recover JSON if wrapped.
        const match = content.match(/\{[\s\S]*\}/);
        if (match) parsed = JSON.parse(match[0]);
      }
      for (const l of targetLangs) {
        if (typeof parsed[l] === "string") translations[l] = parsed[l];
      }
    }

    // Upsert each language
    const rows = Object.entries(translations).map(([lang, value]) => ({
      key,
      lang,
      value,
      updated_at: new Date().toISOString(),
    }));

    const { error: dbErr } = await supabase
      .from("site_translations")
      .upsert(rows, { onConflict: "key,lang" });

    if (dbErr) {
      console.error("DB upsert error", dbErr);
      return new Response(
        JSON.stringify({ error: dbErr.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, translations }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("translate-text error", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});