export async function loadTemplate(templateName: string) {
  // const templateModule = await import(`/templates/${templateName}/index.html`);
  const styleModule = await import(`/templates/${templateName}/style/style.css`);
  // const scriptModule = await import(`/templates/${templateName}/script.js`);

  return {
    // html: templateModule.default,
    css: styleModule.default
    // js: scriptModule.default
  };
}
