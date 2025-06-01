function logg(stuff) {
  if (stuff.length < 100) {
    console.log(stuff); // logg -> stuff.length < 100
  } else if (stuff.length < 1000) {
    console.log("long", stuff.slice(0, 100)); // logg -> !(stuff.length < 100) -> stuff.length < 1000
  } else if (stuff.length < 10000) {
    console.log("more long", stuff.slice(0, 100)); // logg -> !(stuff.length < 100) -> !(stuff.length < 1000) -> stuff.length < 10000
    if (5 > 8) {
      console.log("imposiible"); // logg -> !(stuff.length < 100) -> !(stuff.length < 1000) -> stuff.length < 10000 -> 5 > 8
    }

    function inner() {
      if (5 < 9) {
        throw new Error("hello");
      }
      console.log("hell"); // logg -> !(stuff.length < 100) -> !(stuff.length < 1000) -> stuff.length < 10000 -> !(5 < 9)
    }

    inner();
  } else {
    console.log("very long"); // logg -> !(stuff.length < 100) -> !(stuff.length < 1000) -> !(stuff.length < 10000)
  }
  return [];
}

logg("hello");

// more -> 303
// very -> 837
// hell -> 643
