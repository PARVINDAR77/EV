const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\SEO STZK\\.gemini\\antigravity-ide\\brain\\8952033e-4a1f-48a3-b106-24277d560c43\\.system_generated\\steps\\516\\content.md', 'utf8');

// The file contains a complete SVG starting with <?xml... and ending with </svg>
const match = content.match(/<svg[\s\S]*<\/svg>/);
if (match) {
  let svgCode = match[0];
  // Convert standard SVG to React component
  svgCode = svgCode.replace(/fill="#000000"/g, 'fill="currentColor"');
  svgCode = svgCode.replace(/preserveAspectRatio/g, 'preserveAspectRatio');
  svgCode = svgCode.replace(/viewBox/g, 'viewBox');
  
  const component = `import React from 'react';

export const IndiaMapSVG = (props) => (
  ${svgCode.replace(/<svg /, '<svg {...props} ')}
);
`;

  fs.writeFileSync('d:\\EV\\src\\assets\\images\\IndiaMapSVG.jsx', component);
  console.log("Successfully created IndiaMapSVG.jsx");
} else {
  console.log("Could not find SVG in the markdown file.");
}
