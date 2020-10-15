export default function(type: string) {
  return (name: string) => 'mk-' + type + '_' + name
}
