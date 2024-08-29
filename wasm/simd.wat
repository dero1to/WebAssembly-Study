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
                (v128.store
                    (local.get $ptr)
                    (call $charToUpperCase (v128.load (local.get $ptr)))
                ) ;; *ptr = toUpperCase(*ptr) x 16
                (local.set $ptr
                    (i32.add (local.get $ptr) (i32.const 16))
                ) ;; ptr = ptr + 16
                (local.set $count
                    (local.get $count)
                    (i32.add (local.get $count) (i32.const 1))
                ) ;; $count = $count + 1
                br $loop
            end
        )
        local.get $count ;; return $count
    )

    (func $charToUpperCase (param $chars v128) (result v128)
        (v128.and
            (v128.and
                (i8x16.ge_u (local.get $chars) (i8x16.splat (i32.const 97)))
                (i8x16.le_u (local.get $chars) (i8x16.splat (i32.const 122)))
            );; $char >= 'a' && $char <= 'z'
            (i8x16.splat (i32.const 32))
        ) ;; ($chars >= 'a' && $chars <= 'z') & 32
        local.get $chars
        v128.xor
    )
)