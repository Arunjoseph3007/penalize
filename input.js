function logg(stuff) {
  if (stuff.length < 100) {
    console.log(stuff);
  } else if (stuff.length < 1000) {
    console.log("long", stuff.slice(0, 100));
  } else if (stuff.length < 10000) {
    console.log("more long", stuff.slice(0, 100));
    if (5 > 8) {
      console.log("imposiible");
    }

    function inner() {
      if (5 < 9) {
        throw new Error("hello");
      }
    }

    inner()
  } else {
    console.log("very long");
  }
  return [];
}

logg("hello");
