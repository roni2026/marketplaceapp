# BazarBD — Customer-only build & setup

This build is **customer-side only** — the admin panel (dashboard, ad
moderation, category/user/report management) has been removed from the routes
and the header. Customers can browse categories, view ads, search, post ads,
save favorites, and manage their profile.

To get it running you need a backend and then a build. Two parts:

## 1. Connect a Supabase backend (required — otherwise data won't load)

This app needs its **own** Supabase project with the classifieds schema
(categories, subcategories, profiles, user_roles, ads, ad_images, favorites,
reports).

1. Create a project at https://supabase.com.
2. In the Supabase **SQL Editor**, run the contents of **`supabase/schema.sql`**
   from this repo to create all tables/policies.
3. Get your **Project URL** and **anon / public key** from
   **Project Settings → API**.
4. Provide them to the app. Easiest option — create a **`.env`** file in the
   project root:
   ```
   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...your-anon-public-key...
   ```
   (Or paste them into the `FALLBACK_*` constants in
   `src/integrations/supabase/client.ts` for quick testing.)

> ⚠️ Use the **anon / public** key. Never put the `service_role` key in this
> app — it ships to browsers/devices and the key would be exposed.

## 2. Build

**Web (test in a browser):**
```
npm install
npm run dev        # local dev server
npm run build      # production build -> ./dist
```

**Android APK/AAB (needs Android Studio + Android SDK + JDK 17):**
```
npm run build
npx cap sync android
npx cap open android      # opens the android/ project in Android Studio
```
In Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)** for a
test APK, or set up a signing keystore and build a release AAB for the Play
Store. (An APK/AAB can't be produced without the Android SDK/JDK toolchain, so
this step runs on your machine or a CI/cloud build, not in the browser.)

## What changed to make it customer-only
- `src/App.tsx` — removed the 5 `/admin/*` routes and their imports.
- `src/components/layout/Header.tsx` — removed the "Admin" link.
- `src/integrations/supabase/client.ts` — added a clear backend-config slot and
  a guard so a missing key no longer white-screens the app on launch.
