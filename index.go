package main

import (
	"fmt"
	"math"
	// "math/rand"
)

func add (x, y int) (int, int) {
	return x + y
}

func main() {
	fmt.Printf("Now you have %g problems.\n", math.Nextafter(2, 3))

	fmt.Println(add(2, 4))
}
