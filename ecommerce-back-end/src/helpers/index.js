const path = require('path');
var fs = require('fs');

exports.removeOldImage = (oldImagePath) => {
    if (oldImagePath) {
        const oldPath = path.join(__dirname,"..", "uploads", oldImagePath);
        if (fs.existsSync(oldPath)) {
          fs.unlink(oldPath, (err) => {
            if (err) {
              console.error(err);
              return 1;
            }
            return 0;
          });
        }
      }
}