module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/index.html");
  eleventyConfig.addPassthroughCopy("src/404.html");

  // Collections for different languages
  eleventyConfig.addCollection("pages_en", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/pages/en/**/*.md");
  });

  eleventyConfig.addCollection("pages_es", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/pages/es/**/*.md");
  });

  // Header collections
  eleventyConfig.addCollection("header_en", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/header/en/*.md");
  });

  eleventyConfig.addCollection("header_es", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/header/es/*.md");
  });


  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: process.env.PATH_PREFIX || "/"
  };
};