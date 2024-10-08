// asynchronous
const { readFile, writeFile } = require("fs");

console.log("start");
// similar to addEventListener callback function
readFile("./content/first.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  const first = result;
  readFile("./content/second.txt", "utf-8", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const second = result;

    writeFile(
      "./content/result-async.js.txt",
      `Here is the result: ${first}, ${second}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("done with async.js task");
      },
    );
  });
});

console.log("starting next task");

// can write this code in a more readable way using promises, async.js/await
