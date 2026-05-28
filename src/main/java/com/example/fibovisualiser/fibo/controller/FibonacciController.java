package com.example.fibovisualiser.fibo.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/fibonacci")
@CrossOrigin("*")
public class FibonacciController {

@GetMapping("/{n}")
public List<FibonacciPoint> getFibonacciSeries(@PathVariable int n) {

    List<FibonacciPoint> result = new ArrayList<>();

    long a = 0;
    long b = 1;

    for (int i = 0; i < n; i++) {

        result.add(new FibonacciPoint(i, a));

        long next = a + b;
        a = b;
        b = next;
    }

    return result;
}

    private int fibo(int n) {
        if (n < 2) {
            return n;
        }

        return fibo(n - 1) + fibo(n - 2);
    }

    public static class FibonacciPoint {
        private int index;
        private long value;

        public FibonacciPoint(int index, long value) {
            this.index = index;
            this.value = value;
        }

        public int getIndex() {
            return index;
        }

        public long getValue() {
            return value;
        }
    }
}