function unique(arr) {
        function isSame(obj1, obj2) {
            for (const prop in obj1) {
                    if (!(prop in obj2) || obj1[prop] != obj2[prop]) {
                        return false;
                    }
                }
                return true;
            }
            for (var i = 0; i < arr.length - 1; i++) {
                for (var j = i + 1; j < arr.length; j++) {
                    if (isSame(arr[i], arr[j])) {
                        arr.splice(j, 1);
                        j --;
                    }
                }
            }
            return arr;
}


var arr = unique([
    {
        a: 1,
        b: 2,
        c: 3
    },
    {
        a: 1,
        b: 1,
        c: 4
    },
    {
        b: 2,
        c: 3,
        a: 1
    },
    {
        a: 1,
        b: 2,
        c: 3
    }
])

console.log(arr);