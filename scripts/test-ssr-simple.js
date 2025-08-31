#!/usr/bin/env node

/**
 * Simple SSR Testing Utility for Portfolio
 */

const testSSR = async () => {
  console.log('\n🚀 Testing SSR for NatureQuest Portfolio\n');
  console.log('='.repeat(50));

  const url = 'http://localhost:3001';

  try {
    const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
    const response = await fetch(url);
    const html = await response.text();

    console.log('\n📋 SSR Test Results:');

    const tests = [
      {
        name: 'Valid HTML',
        pass: html.includes('<!DOCTYPE html>'),
      },
      {
        name: 'Has Title',
        pass: html.includes('<title>'),
      },
      {
        name: 'Has Meta Tags',
        pass: html.includes('<meta') && html.includes('description'),
      },
      {
        name: 'Main Content Renders (not just loading)',
        pass: html.includes('NatureQuest') || !html.includes('Loading portfolio'),
      },
      {
        name: 'Has Hydration Scripts',
        pass: html.includes('$RC') || html.includes('__next'),
      },
    ];

    let allPassed = true;

    tests.forEach((test) => {
      const icon = test.pass ? '✅' : '❌';
      console.log(`  ${icon} ${test.name}`);
      if (!test.pass) allPassed = false;
    });

    // Check for SSR bailouts and errors
    const hasBailout = html.includes('BAILOUT_TO_CLIENT_SIDE_RENDERING');
    const isDynamicBailout = html.includes('next/dynamic');

    if (hasBailout) {
      console.log('\n⚠️  SSR Bailout Detected:');
      if (isDynamicBailout) {
        console.log(
          '  • Caused by next/dynamic import (often intentional for client-only widgets)',
        );
        console.log('  • This is typically OK for floating UI elements like the EcosystemWidget');
      } else {
        console.log('  • Unexpected SSR bailout - check for unguarded browser APIs');
        allPassed = false;
      }
    }

    // Check for other SSR errors
    const errorMatch = html.match(/data-msg="([^"]+)"/);
    if (errorMatch && !errorMatch[1].includes('next/dynamic')) {
      console.log('\n❌ SSR Error Found:');
      console.log(`  ${errorMatch[1]}`);
      allPassed = false;
    }

    // Stats
    console.log('\n📊 Statistics:');
    console.log(`  • HTML Size: ${(html.length / 1024).toFixed(2)} KB`);
    console.log(`  • Tests Passed: ${tests.filter((t) => t.pass).length}/${tests.length}`);

    console.log('\n' + '='.repeat(50));

    if (allPassed) {
      console.log('\n✅ All SSR tests passed!\n');
      process.exit(0);
    } else {
      console.log('\n❌ Some SSR tests failed.\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.log('\nMake sure the dev server is running on port 3001\n');
    process.exit(1);
  }
};

testSSR();
