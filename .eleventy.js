module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('assets/fonts');
  return {
    // Use liquid in html templates
    htmlTemplateEngine: 'liquid'
  };
};
