module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('favicon.svg');
  eleventyConfig.addPassthroughCopy('assets');
  return {
    // Use liquid in html templates
    htmlTemplateEngine: 'liquid'
  };
};
