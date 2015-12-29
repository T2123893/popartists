/**
 *
 * @param A weights
 * @param B targets
 * @param M floors
 * @param X maximum people
 * @param Y maximum weight
 */

function solution(A, B, M, X, Y) {

    var queLen = A.length;
    var elevator =[];
    var stopTimes = 0;

    function _overload() {
        if (elevator.length >= 2) {
            return true;
        }
    }

    // iterate floors
    for (var l = 0; queLen > 0 && l <  M; l++) {

        console.log('floor => ', l+1);

        // iterate queue
        for (var i = 0; l == 0 && i < A.length && elevator.length < 2; ) {
            if (_overload()) {
                break;
            }

            //elevator.concat(B.splice(0, 2));
            for (var t = 0; t < X; t++) {
                if (B[t]) {
                    elevator.push(B[t]);
                }
            }
            B.splice(0, elevator.length);
            A.splice(0, X);

            stopTimes++;
            console.log('load', X, 'passengers, target floors => ', elevator, ', Current quue => ', A.length, A);
        }

        for (var x = 0; l > 0 && x < elevator.length; x++) {
            if (elevator[x] === l+1) {
                console.log('passenger target', elevator[x], 'get off');
                elevator.splice(x, 1);
                stopTimes++;
                if (elevator.length == 0) {
                    l = -1;
                    console.log('\n>>> back to ground floor');
                    break;
                }
                console.log('current elevator has', elevator.length, elevator);
            }
        }

    }


    return stopTimes;

}

console.log(solution([60, 80, 40], [2, 3, 5], 5, 2, 200));
