namespace tween {

    export class EaseFunction {
        static None(t: number) {
            return t;
        }

        static SineEaseIn(t: number) {
            return Math.sin((t - 1) * Math.PI * .5) + 1;
        }

        static SineEaseOut(t: number) {
            return Math.sin(t * Math.PI * .5);
        }

        static SineEaseInOut(t: number) {
            return Math.sin((t - .5) * Math.PI) * .5 + .5;
        }

        static SineEaseOutIn(t: number) {
            if (t < 0.5) {
                return Math.sin(t * Math.PI) * .5;
            }
            return Math.sin((t - 1) * Math.PI) * .5 + 1;
        }

        static QuadEaseIn(t: number) {
            return t * t;
        }

        static QuadEaseOut(t: number) {
            return -(t - 1) * (t - 1) + 1;
        }

        static QuadEaseInOut(t: number) {
            if (t < .5) {
                return t * t * 2;
            }
            return -(t - 1) * (t - 1) * 2 + 1;
        }

        static QuadEaseOutIn(t: number) {
            var s = (t - .5) * (t - .5) * 2;
            if (t < .5) {
                return .5 - s;
            }
            return .5 + s;
        }

        static CubicEaseIn(t: number) {
            return t * t * t;
        }

        static CubicEaseOut(t: number) {
            return (t - 1) * (t - 1) * (t - 1) + 1;
        }

        static CubicEaseInOut(t: number) {
            if (t < .5) {
                return t * t * t * 4;
            }
            return (t - 1) * (t - 1) * (t - 1) * 4 + 1;
        }

        static CubicEaseOutIn(t: number) {
            return (t - .5) * (t - .5) * (t - .5) * 4 + .5;
        }

        static QuartEaseIn(t: number) {
            return t * t * t * t;
        }

        static QuartEaseOut(t: number) {
            var a = (t - 1);
            return -a * a * a * a + 1;
        }

        static QuartEaseInOut(t: number) {
            if (t < .5) {
                return t * t * t * t * 8;
            }
            var a = (t - 1);
            return -a * a * a * a * 8 + 1;
        }

        static QuartEaseOutIn(t: number) {
            var s = (t - .5) * (t - .5) * (t - .5) * (t - .5) * 8;
            if (t < .5) {
                return .5 - s;
            }
            return .5 + s;
        }

        static QuintEaseIn(t: number) {
            return t * t * t * t * t;
        }

        static QuintEaseOut(t: number) {
            var a = t - 1;
            return a * a * a * a * a + 1;
        }

        static QuintEaseInOut(t: number) {
            if (t < .5) {
                return t * t * t * t * t * 16;
            }
            var a = t - 1;
            return a * a * a * a * a * 16 + 1;
        }

        static QuintEaseOutIn(t: number) {
            var a = t - .5;
            return a * a * a * a * a * 16 + 0.5;
        }

        static ExpoEaseIn(t: number) {
            return Math.pow(2, 10 * (t - 1));
        }

        static ExpoEaseOut(t: number) {
            return -Math.pow(2, -10 * t) + 1;
        }

        static ExpoEaseInOut(t: number) {
            if (t < .5) {
                return Math.pow(2, 10 * (t * 2 - 1)) * .5;
            }
            return -Math.pow(2, -10 * (t - .5) * 2) * .5 + 1.00048828125;
        }

        static ExpoEaseOutIn(t: number) {
            if (t < .5) {
                return -Math.pow(2, -20 * t) * .5 + .5;
            }
            return Math.pow(2, 10 * ((t - .5) * 2 - 1)) * .5 + .5;
        }

        static CircEaseIn(t: number) {
            return 1 - Math.sqrt(1 - t * t);
        }

        static CircEaseOut(t: number) {
            return Math.sqrt(1 - (1 - t) * (1 - t));
        }

        static CircEaseInOut(t: number) {
            if (t < .5) {
                return .5 - Math.sqrt(.25 - t * t);
            }
            return Math.sqrt(.25 - (1 - t) * (1 - t)) + .5;
        }

        static CircEaseOutIn(t: number) {
            var s = Math.sqrt(.25 - (.5 - t) * (.5 - t));
            if (t < .5) {
                return s;
            }
            return 1 - s;
        }

        static BackEaseIn(t: number) {
            return 2.70158 * t * t * t - 1.70158 * t * t;
        }

        static BackEaseOut(t: number) {
            var a = t - 1;
            return 2.70158 * a * a * a + 1.70158 * a * a + 1;
        }

        static BackEaseInOut(t: number) {
            var a = t - 1;
            if (t < .5) {
                return 10.80632 * t * t * t - 3.40316 * t * t;
            }
            return 10.80632 * a * a * a + 3.40316 * a * a + 1;
        }

        static BackEaseOutIn(t: number) {
            var a = t - .5;
            if (t < .5) {
                return 10.80632 * a * a * a + 3.40316 * a * a + .5;
            }
            return 10.80632 * a * a * a - 3.40316 * a * a + .5;
        }

        static ElasticEaseIn(t: number) {
            if (t == 0 || t == 1)
                return t;
            return -(Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.075) * 2 * Math.PI / .3));
        }

        static ElasticEaseOut(t: number) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            return (Math.pow(2, 10 * -t) * Math.sin((-t - .075) * 2 * Math.PI / .3)) + 1;
        }

        static ElasticEaseInOut(t: number) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            if (t < .5) {
                return -(Math.pow(2, 10 * t - 10) * Math.sin((t * 2 - 2.15) * Math.PI / .3));
            }
            return (Math.pow(2, 10 - 20 * t) * Math.sin((-4 * t + 1.85) * Math.PI / .3)) * .5 + 1;
        }

        static ElasticEaseOutIn(t: number) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            if (t < .5) {
                return (Math.pow(2, -20 * t) * Math.sin((-t * 4 - .15) * Math.PI / .3)) * .5 + .5;
            }
            return -(Math.pow(2, 20 * (t - 1)) * Math.sin((t * 4 - 4.15) * Math.PI / .3)) * .5 + .5;
        }

        private static bounceEaseIn(t: number) {
            return 1 - EaseFunction.bounceEaseOut(1 - t);
        }

        private static bounceEaseOut(t: number) {
            var s;
            var a = 7.5625;
            var b = 2.75;
            if (t < (1 / 2.75)) {
                s = a * t * t;
            }
            else if (t < (2 / b)) {
                s = (a * (t - (1.5 / b)) * (t - (1.5 / b)) + .75);
            }
            else if (t < (2.5 / b)) {
                s = (a * (t - (2.25 / b)) * (t - (2.25 / b)) + .9375);
            }
            else {
                s = (a * (t - (2.625 / b)) * (t - (2.625 / b)) + .984375);
            }
            return s;
        }


        static BounceEaseInOut(t: number) {
            if (t < .5)
                return EaseFunction.bounceEaseIn(t * 2) * .5;
            else
                return EaseFunction.bounceEaseOut(t * 2 - 1) * .5 + .5;
        }

        static BounceEaseOutIn(t: number) {
            if (t < .5)
                return EaseFunction.bounceEaseOut(t * 2) * .5;
            else
                return EaseFunction.bounceEaseIn(t * 2 - 1) * .5 + .5;
        }

        static BounceEaseIn = EaseFunction.bounceEaseIn;
        static BounceEaseOut = EaseFunction.bounceEaseOut;
    }
}

window["tween"] = tween;