(module
    (memory (export "memory") 1)
    (func (export "toUpperCase") (param $ptr i32) (param $len i32) (result i32)
        (local $count i32)
        (local $end i32)
        (local.set $end
            (i32.add (local.get $ptr) (local.get $len))
        );; $end = ptr + len
        (loop $loop
            (i32.lt_u (local.get $ptr) (local.get $end)) ;; ptr < end
            if
                (i32.store8
                    (local.get $ptr)
                    (call $charToUpperCase (i32.load8_u (local.get $ptr)))
                ) ;; *ptr = toUpperCase(*ptr)
                (local.set $ptr
                    (i32.add (local.get $ptr) (i32.const 1))
                ) ;; ptr = ptr + 1
                (local.set $count
                    (local.get $count)
                    (i32.add (local.get $count) (i32.const 1))
                ) ;; $count = $count + 1
                br $loop
            end
        )
        local.get $count ;; return $count
    )

    (func $charToUpperCase (param $char i32) (result i32)
        (i32.and
            (i32.ge_u (local.get $char) (i32.const 97))
            (i32.le_u (local.get $char) (i32.const 122))
        );; $char >= 97 && $char <= 122
        if (result i32)
            (i32.xor (local.get $char) (i32.const 32)) ;; $char - 32
        else
            (local.get $char) ;; $char
        end
    )
)