import http from 'http';

const routes = [
  '/',
  '/about',
  '/contact',
  '/calculator',
  '/franchise',
  '/solutions/residential',
  '/solutions/workplace',
  '/solutions/commercial',
  '/solutions/fleet',
  '/solutions/highway',
  '/products/ac-chargers',
  '/products/dc-chargers',
  '/products/accessories',
  '/products/software',
  '/product/ac-7-4kw',
  '/product/dc-60kw',
  '/product/charge-app',
  '/product/cms',
  '/product/enterprise-api',
  '/services/installation',
  '/services/maintenance'
];

async function testRoute(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:5174${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          statusCode: res.statusCode,
          hasRoot: data.includes('<div id="root"></div>'),
          hasTitle: data.includes('AXION CHARGE')
        });
      });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  console.log("=== Testing All 21 Routes on Preview Server ===");
  let passed = 0;
  for (const r of routes) {
    const res = await testRoute(r);
    if (res.statusCode === 200 && res.hasRoot) {
      console.log(`PASS: ${r} -> HTTP ${res.statusCode} (HTML valid)`);
      passed++;
    } else {
      console.error(`FAIL: ${r} ->`, res);
    }
  }
  console.log(`\nResults: ${passed} / ${routes.length} routes passed.`);
}

run();
