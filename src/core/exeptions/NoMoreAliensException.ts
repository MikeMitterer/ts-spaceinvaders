/**
 * NoMoreAliens
 */
export default class NoMoreAliensException extends Error {
    constructor(message?: string) {
        // 'Error' breaks prototype chain here
        super(message);

        /*
         *
         * [ 2023 10 30] Der ganze Sumpf sollte spätestens nach der Umstellung auf
         * Vite, ESNEXT usw. nicht mehr nötig sein.
         *
            // restore prototype chain
            const actualProto = new.target.prototype;

            // see: https://stackoverflow.com/a/48342359/504184

            if (Object.setPrototypeOf) {
                Object.setPrototypeOf(this, actualProto);
            } else {
                // @ts-ignore (ignore as it's a hacky workaround)
                this.__proto__ = actualProto;
            }
         */

        // this.name = NoMoreAliens.name; // stack traces display correctly now
    }
}
