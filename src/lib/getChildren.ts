import { gsap } from 'gsap';

export default function getChildren(selector: string, q: gsap.utils.SelectorFunc) {
	return q(selector).at(0)!.children;
}
