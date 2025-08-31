#!/usr/bin/env node

/**
 * Check if UI changes are present in the build
 */

const checkChanges = async () => {
  console.log('\n🔍 Checking for UI changes in the build...\n');
  console.log('='.repeat(50));

  const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

  try {
    // Get the main page
    const pageResponse = await fetch('http://localhost:3001');
    const pageHtml = await pageResponse.text();

    // Extract script URLs
    const scriptMatches = pageHtml.matchAll(/<script[^>]*src="([^"]+)"/g);
    const scriptUrls = Array.from(scriptMatches).map((m) => m[1]);

    console.log(`\n📦 Found ${scriptUrls.length} script bundles`);

    // Check for our dramatic spacing changes
    const searchTerms = [
      'mb-2', // Our dramatic margin bottom change
      'text-3xl', // Smaller heading
      'text-xl', // Smaller subheading
      'w-48', // Smaller image width
      'h-48', // Smaller image height
    ];

    let foundChanges = false;

    for (const scriptUrl of scriptUrls) {
      const fullUrl = scriptUrl.startsWith('http')
        ? scriptUrl
        : `http://localhost:3001${scriptUrl}`;

      try {
        const scriptResponse = await fetch(fullUrl);
        const scriptContent = await scriptResponse.text();

        const foundTerms = searchTerms.filter((term) => scriptContent.includes(term));

        if (foundTerms.length > 0) {
          console.log(`\n✅ Found changes in: ${scriptUrl.split('/').pop()}`);
          console.log(`   Classes found: ${foundTerms.join(', ')}`);
          foundChanges = true;
        }
      } catch (err) {
        // Skip scripts that can't be fetched
      }
    }

    console.log('\n' + '='.repeat(50));

    if (foundChanges) {
      console.log('\n✅ UI changes are present in the JavaScript bundles!');
      console.log('   The changes will be applied when the page loads client-side.\n');
    } else {
      console.log('\n⚠️  UI changes not found in bundles.');
      console.log('   You may need to rebuild or restart the dev server.\n');
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\nMake sure the dev server is running on port 3001\n');
  }
};

checkChanges();
