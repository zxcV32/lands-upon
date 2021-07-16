const Image = require('@11ty/eleventy-img'),
  path = require('path');

async function imageShortcode(src, alt) {
  let srcPrefix = `./assets/images/`;
  src = srcPrefix + src;
  console.log(`Generating image(s) from:  ${src}`);
  if (alt === undefined) {
    // Throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }
  let metadata = await Image(src, {
    formats: ['webp'],
    urlPath: '/images/',
    outputDir: './_site/images/',
    sharpOptions: {
      quality: 50
    },
    /* =====
    Now we'll make sure each resulting file's name will 
    make sense to you. **This** is why you need 
    that `path` statement mentioned earlier.
    ===== */
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    }
  });

  return `<picture>
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
          .map((entry) => entry.srcset)
          .join(', ')}"">`;
      })
      .join('\n')}
    <img
      src="${src}"
      alt="${alt}"
      loading="lazy"
      decoding="async">
  </picture>`;
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('favicon.svg');
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('script.js');

  eleventyConfig.addLiquidShortcode('image', imageShortcode);
  return {
    // Use liquid in html templates
    htmlTemplateEngine: 'liquid'
  };
};
