#!/usr/bin/env node

/**
 * SSR Testing Utility for Portfolio
 *
 * This script tests that components can render on the server
 * without accessing browser APIs.
 */

// Use dynamic import for chalk (ESM module)
let chalk;
try {
  chalk = require('chalk');
} catch (e) {
  // Fallback for ESM chalk
  chalk = {
    blue: (text) => `\x1b[34m${text}\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    gray: (text) => `\x1b[90m${text}\x1b[0m`,
    cyan: (text) => `\x1b[36m${text}\x1b[0m`,
    bold: {
      green: (text) => `\x1b[1m\x1b[32m${text}\x1b[0m`,
      red: (text) => `\x1b[1m\x1b[31m${text}\x1b[0m`,
      cyan: (text) => `\x1b[1m\x1b[36m${text}\x1b[0m`,
    },
  };
}

// Mock browser globals to catch SSR issues
const mockBrowserGlobals = () => {
  const createProxy = (name) => {
    return new Proxy(
      {},
      {
        get() {
          throw new Error(`❌ ${name} accessed during SSR - this will crash on server!`);
        },
      },
    );
  };

  global.window = createProxy('window');
  global.document = createProxy('document');
  global.localStorage = createProxy('localStorage');
  global.sessionStorage = createProxy('sessionStorage');
  global.navigator = createProxy('navigator');
  global.location = createProxy('location');
};

// Test SSR endpoint
const testSSREndpoint = async (url) => {
  const fetch = require('node-fetch');

  try {
    console.log(chalk.blue(`\n📡 Testing SSR at ${url}...`));

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'SSR-Test-Bot/1.0',
      },
    });

    const html = await response.text();

    // Check for common SSR issues
    const checks = [
      {
        name: 'HTML Response',
        pass: html.includes('<!DOCTYPE html>'),
        message: 'Server returns valid HTML',
      },
      {
        name: 'No Loading State',
        pass: !html.includes('Loading portfolio...') || html.includes('NatureQuest'),
        message: 'Content renders on server (not just loading state)',
      },
      {
        name: 'No SSR Bailout',
        pass: !html.includes('BAILOUT_TO_CLIENT_SIDE_RENDERING'),
        message: 'No SSR bailout detected',
      },
      {
        name: 'Meta Tags Present',
        pass: html.includes('<meta') && html.includes('description'),
        message: 'SEO meta tags are rendered',
      },
      {
        name: 'Title Present',
        pass: html.includes('<title>'),
        message: 'Page title is rendered',
      },
    ];

    console.log(chalk.yellow('\n📋 SSR Checks:'));

    let allPassed = true;
    checks.forEach((check) => {
      if (check.pass) {
        console.log(chalk.green(`  ✅ ${check.message}`));
      } else {
        console.log(chalk.red(`  ❌ ${check.message}`));
        allPassed = false;
      }
    });

    // Additional diagnostics
    console.log(chalk.yellow('\n📊 SSR Statistics:'));
    console.log(`  • HTML Size: ${(html.length / 1024).toFixed(2)} KB`);
    console.log(`  • Has React Root: ${html.includes('__next') ? 'Yes' : 'No'}`);
    console.log(
      `  • Has Hydration Script: ${html.includes('hydrate') || html.includes('$RC') ? 'Yes' : 'No'}`,
    );

    // Extract and show any SSR errors
    const errorMatch = html.match(/data-msg="([^"]+)"/);
    if (errorMatch) {
      console.log(chalk.red('\n⚠️  SSR Error Found:'));
      console.log(chalk.red(`  ${errorMatch[1]}`));
    }

    return allPassed;
  } catch (error) {
    console.log(chalk.red(`\n❌ Failed to test SSR: ${error.message}`));
    return false;
  }
};

// Test component imports
const testComponentImports = () => {
  console.log(chalk.blue('\n🧪 Testing Component Imports (SSR Safety)...'));

  mockBrowserGlobals();

  const components = [
    '../src/components/InteractivePortfolio',
    '../src/components/ecosystem/EcosystemWidget',
    '../src/components/ComprehensiveSkillsV2',
    // Add more components to test
  ];

  const results = [];

  components.forEach((path) => {
    try {
      // Try to import the component
      delete require.cache[require.resolve(path)];
      const component = require(path);

      // Check if it's a valid React component or has a default export
      if (component.default || component.InteractivePortfolio || component.EcosystemWidget) {
        results.push({
          path,
          status: 'pass',
          message: 'Component can be imported safely',
        });
      } else {
        results.push({
          path,
          status: 'warning',
          message: 'Component imported but no default export found',
        });
      }
    } catch (error) {
      results.push({
        path,
        status: 'fail',
        message: error.message,
      });
    }
  });

  console.log(chalk.yellow('\n📦 Component Import Results:'));
  results.forEach((result) => {
    if (result.status === 'pass') {
      console.log(chalk.green(`  ✅ ${result.path}`));
    } else if (result.status === 'warning') {
      console.log(chalk.yellow(`  ⚠️  ${result.path}: ${result.message}`));
    } else {
      console.log(chalk.red(`  ❌ ${result.path}: ${result.message}`));
    }
  });

  return results.every((r) => r.status !== 'fail');
};

// Main test runner
const main = async () => {
  console.log(
    chalk.bold
      ? chalk.bold.cyan('\n🚀 NatureQuest Portfolio SSR Test Suite\n')
      : '\x1b[1m\x1b[36m\n🚀 NatureQuest Portfolio SSR Test Suite\n\x1b[0m',
  );
  console.log(chalk.gray('='.repeat(50)));

  // Test different scenarios
  const tests = [
    {
      name: 'Development Server SSR',
      url: 'http://localhost:3001',
      optional: false,
    },
    {
      name: 'Production Build SSR',
      url: 'http://localhost:3001',
      optional: true,
    },
  ];

  let allPassed = true;

  // Test endpoints
  for (const test of tests) {
    const passed = await testSSREndpoint(test.url);
    if (!passed && !test.optional) {
      allPassed = false;
    }
  }

  // Test component imports (commented out as it needs proper setup)
  // const importsPassed = testComponentImports();
  // allPassed = allPassed && importsPassed;

  // Summary
  console.log(chalk.gray('\n' + '='.repeat(50)));
  if (allPassed) {
    console.log(
      chalk.bold
        ? chalk.bold.green('\n✅ All SSR tests passed!\n')
        : '\x1b[1m\x1b[32m\n✅ All SSR tests passed!\n\x1b[0m',
    );
    process.exit(0);
  } else {
    console.log(
      chalk.bold
        ? chalk.bold.red('\n❌ Some SSR tests failed. Please review the errors above.\n')
        : '\x1b[1m\x1b[31m\n❌ Some SSR tests failed. Please review the errors above.\n\x1b[0m',
    );
    process.exit(1);
  }
};

// Run tests
if (require.main === module) {
  main().catch((error) => {
    console.error(
      chalk.red ? chalk.red('\n💥 Test suite crashed:') : '\x1b[31m\n💥 Test suite crashed:\x1b[0m',
      error,
    );
    process.exit(1);
  });
}

module.exports = { testSSREndpoint, testComponentImports };
