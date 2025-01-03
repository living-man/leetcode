export default function bs_list(haystack: number[], needle: number): boolean {

    let [lo, hi] = [0, haystack.length];

    while (lo < hi) {
        let m = Math.floor(lo + (hi - lo) / 2);
        const v = haystack[m];
        if (v === needle) {
            return true;
        } else if (v > needle) {
            hi = m;
        } else {
            lo = m + 1;
        }
    }
    return false;
}