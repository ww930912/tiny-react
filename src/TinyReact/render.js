import diff from './diff'

export default function render(virtualDOM, container) {
    diff(virtualDOM, container, container.firstChild)
}