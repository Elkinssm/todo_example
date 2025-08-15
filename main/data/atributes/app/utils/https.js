module.exports.sendRequestAsync = (requestConfig) => {
  return new Promise((resolve, reject) => {
    const startTime = new Date();
    my.request(
      Object.assign({}, requestConfig, {
        success: (res) => {
          resolve(res);
        },
        fail: (res) => {
          reject(res);
        },
        complete: (res) => {
          console.log("📊 Petición HTTP completada:", {
            url: requestConfig.url,
            method: requestConfig.method,
            duration: `${new Date() - startTime}ms`,
            status: res.statusCode || "N/A",
          });
        },
      })
    );
  });
};
