module.exports = function(eleventyConfig) {
  // Get path prefix
  const pathPrefix = process.env.PATH_PREFIX || "/";
  
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/index.html");
  eleventyConfig.addPassthroughCopy("src/404.html");
  
  // Add a filter to prepend the path prefix
  eleventyConfig.addFilter("prefixUrl", function(url) {
    // Don't prefix external URLs
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) {
      return url;
    }
    // Remove leading slash and add prefix
    const cleanUrl = url.startsWith('/') ? url : '/' + url;
    return pathPrefix === '/' ? cleanUrl : pathPrefix.replace(/\/$/, '') + cleanUrl;
  });

  // Collections for different languages
  eleventyConfig.addCollection("pages_en", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/pages/en/**/*.md");
  });

  eleventyConfig.addCollection("pages_es", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/pages/es/**/*.md");
  });


  // Configure markdown-it to handle path prefixes
  const markdownIt = require("markdown-it");
  const md = markdownIt({ html: true, linkify: true });
  
  // Override the default link renderer
  const defaultLinkRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const hrefIndex = tokens[idx].attrIndex('href');
    if (hrefIndex >= 0) {
      const href = tokens[idx].attrs[hrefIndex][1];
      // Only modify internal links
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        tokens[idx].attrs[hrefIndex][1] = pathPrefix === '/' ? href : pathPrefix.replace(/\/$/, '') + href;
      }
    }
    return defaultLinkRender(tokens, idx, options, env, self);
  };
  
  eleventyConfig.setLibrary("md", md);

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