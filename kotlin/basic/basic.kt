// It can be compile into a jar file
// > kotlinc hello.kt -include-runtime -d hello.jar

fun main(){
    var helloInfered = "Hi guys"
    var hello: String = "Hi guys"
    var helloNullSafe: String? = "Hi guys"
    println(hello)
}


// OOP
class Humanoid {
    // attribute
    val name = "Jeff"

    // method
    fun yo(){
        print(name)
    }
}

// Extensions functions
// Modify content of a class without inheritence
fun Humanoid.walk(){
    println("Walking...")
}



// Functions are first-class objects
// so they can be stored as variables,
// passed as arguments or used anonymously with lambdas
fun double(x: Int) = x*2

val lambda: (Int) -> Int = { num -> double(num)}




// Data Classes
// Avoid the needing to create getters and setters
// Support destructuring objects
data class User(val name: String, val age: Int)

val person = User("jeff", 75)

val (name, age) = person