import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fileRemover = (filename) => {
  fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
    if (err && err.code == "ENOENT") {
      // File doesn't exist
      console.log(`File ${filename} does not exist, remover won't remove it`);
    } else if (err) {
      console.log(`Error occurred while trying to remove file: ${filename}`);
    } else {
      console.log(`Removed ${filename}`);
    }
  });
};

export { fileRemover };
