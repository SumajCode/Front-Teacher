import { Badge } from '@/components/ui/badge'

export function getStatusBadge(status: string) {
  switch (status) {
    case 'published':
      return <Badge className="bg-green-500 hover:bg-green-600">Publicado</Badge>
    case 'draft':
      return (
        <Badge
          variant="outline"
          className="border-amber-500 text-amber-600 bg-amber-50 hover:bg-amber-100"
        >
          Borrador
        </Badge>
      )
    case 'archived':
      return (
        <Badge
          variant="outline"
          className="border-gray-500 text-gray-600 bg-gray-50 hover:bg-gray-100"
        >
          Archivado
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

export function getColorClass(color: string) {
  switch (color) {
    case 'blue':
      return 'from-blue-500 to-blue-700'
    case 'amber':
      return 'from-amber-500 to-amber-700'
    case 'cyan':
      return 'from-cyan-500 to-cyan-700'
    case 'green':
      return 'from-green-500 to-green-700'
    case 'purple':
      return 'from-purple-500 to-purple-700'
    default:
      return 'from-blue-500 to-blue-700'
  }
}
