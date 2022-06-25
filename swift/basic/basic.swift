// Run swift compiler:
// > swiftc -o basic basic.swift
// > ./basic

let greeting = "hi mom"
print(greeting)

// var creates mutable value
var apples = 23
apples += 1



// let creates immutable variable/constant
let hello = "hi mon"

// explicit type
let helloExplicit: String = "hi mom explicit"

// Optional value
let maybe: String? = nil

if(maybe == nil){
  print("missing value...")
}




// Function with named arguments
// use _ to set positional arguments
func whatUp(_ name: String, emoji: String) -> String {
  return "Hello \(name). Swift is \(emoji)"
}

whatUp("Bruno", emoji: "🍎")


// Functions are first-class objects in Swift
// They can be passed as arguments, used as return values and nested to create closures
func firstClassFun(callback: (Int) -> Double) {

  func nested(){
    // do something
  }

  return nested 
}

// Swift also supports OOP
class Humanoid {
  var dna = "🧬"
  func spear(){
    print("I'm alive!")
  }
}

var human = Humanoid()
human.spear()