# Basic Syntax
# Everything is an object
# Every object can be modified
# Ruby has dynamic typing, but with RBS we can add type system


class String
    def emojify
        "😀 " + self
    end
end


# variable
hello = "hello !"

# Constant
WORLD = "World"

# Global variable
$hey = "hey !"



# use of methods
up_hello = "hello".upcase()
#parentethis are optional
up_hello2 = "hello".upcase


# print
puts hello


# methods
# returns 1 object
# return keyword is not necessary
def greet(name)
    puts "What's up #{name}"
end




# OOP
class Human

    # @@static
    @@human_population = 0

    # Read & Write (getter and setters for)
    attr_accessor :face

    #constructor
    def initialize()
        # @ instance member
        @dna = Random.rand
        @face = "😀"
    end

    def quack()
        puts "quack! #{@dna} - #{face}"
    end
end

jeff = Human.new
puts jeff.quack



# if statements
puts "\n--- if statements ---"
if WORLD == "World"
    puts "#{WORLD} equals 'World'"
end

# loops
puts "\n--- loops ---"

names = ["Foo", "Bar", "John"]
puts "- each"
names.each do |item|
    puts "Printing #{item}"
end

puts "- each_with_index"
names.each_with_index do |item, index|
    puts "Printing #{item} at index #{index}."
end

# "do" block are like anonymous function
puts "- times"
3.times do |time|
    puts "Ruby is cool 💎 #{time}"
end

puts "- for in"
for i in 1..5
    puts "Using for-loop ... #{i}"
end

# -- string
puts "\n--- String ---"
# split
puts "2022-Sep-15".split("-")

# substitute
puts "Hello".sub(/ll/, "y y")

# Index of char at position
puts "Hello".index("l")

long_str = "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
puts long_str[0]
puts long_str[1,5]
puts long_str['Ipsum']

dummy = "dummy"
long_str[dummy] = 'elegant'
puts long_str

#join
puts "Join > " + names.join(" + ")


# Filename
# __FILE__ is the current file name
puts "This is the file #{__FILE__}"
# $0 is the file that started the program
puts "This is the $0 #{$0}"

