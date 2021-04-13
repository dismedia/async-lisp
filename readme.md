

# Lisp ts interpreter
with async processing 


### needed
```node, npm```


### install

```
npm i
```


### test
```
npm test
```


### how it works

```javascript
const context=createContext({a:"hello"})
const result = await interpret(`(8 9 "c" a))`)(context)
    
// or

interpret(`(8 9 "c" a)`)(context).then((r) => {
    // ...
})    

//expect
[8 , 9 , "c", "hello" ]
```

### what is interesting here?
you can easily implement asynchronous operators, import pieces of code at runtime (simply by ```get```) as well as parallel process.


### depends on
```axios``` to do http

### some of tested expressions
see: ```lisp.spec.ts``` 
```lisp
1
"lisp"
()
(8 9 "c")
((8 9) "c" ("a" ("foo" "bar")))
(a c b)
(add 1 20)
(add 1 four (add (add 3 3 3) (add 10 1)) 2)
(4 (add 1 20) (add 30 10))
( add  (add 4 1) 4)
(eq 1 20)
(eq 20 20)
(eq "a" "a")
(eq "a" "b")
(eq "1" 1)
(eq a b)
(eq a b)
(lett((x 55) (y 44))( x y "bar"))
(lett ((x 0) (y 1) ( z 77)) (x y z (add x y z)))
(lett ((x 55 ) (y 45)) ( ( add y x) "bar"))
(lett ((x (add 55 33) ) (y (add 1 4))) (x y (add x y)) )
(lett ((x 1)) x )
(lett ((x 7)) (lett ((y 4)) (y x (add y x) )))
(lett ((x 7)) (lett ((y x)) (y x (add y x) )))
(lett ((x (1 2))) (lett ((y x)) (y x)))
(lett ((x (1 2 100))) (sumArray x))
(httpGet url (httpStatus data) (data httpStatus))
(headLazy ((add 90 9) 4 x))
(tailLazy (x 99 4))
(head(tail((0 0) (99 5) 0)))
(head(head(tail((0 0) (99 5) 0))))
(tailLazy (x (tailLazy(99 5 4)) ) )
( tail(tail(tail(1 2 3 4)))) )
("bar" (compile source)) )
(3 5 "foo")
(lett ((x 9) (y 4) (z 1000 ))(compile source))
(add x y (compile innerSource))
(add z z )
((lambda (x y z)(z y x y z))( 1 2 3) )
(lett ((a 1)(b 2)(c 3)) ((lambda (x y z)(z y x y z))(a b c)) ) 
(iff (eq 10 10) 1 2)
(iff (eq 10 11) 1 2)
(iff (eq 10 10) (willExecuteMock) (willNotExecuteMock))
(iff (eq 11 10) (willExecuteMock) (willNotExecuteMock))
(httpGet url (status source) (compile source))
(lett ((x 99)) (httpGet url (status source) (sumArray (compile source))))
(defun F (x) x ( F ((add 6 -1)) ))
(defun F (x y) (add y x y x 1) (F (88 14)))
(
            defun fib (x) 
                (iff (lte x 1) 
                    1 
                    (add (fib(add -1 x)) (fib(add -2 x)))
                ) 
            (fib fibN)
        )
```


