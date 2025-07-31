import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  TrendingUp,
  Home,
  CreditCard,
  PiggyBank,
  Calculator,
  FileText,
  Shield
} from "lucide-react"

export default function BlogPage() {
  const featuredArticles = [
    {
      id: 1,
      title: "Guía completa para conseguir tu primera hipoteca en 2024",
      excerpt: "Todo lo que necesitas saber sobre requisitos, documentación y mejores prácticas para obtener tu primera hipoteca.",
      category: "Hipotecas",
      author: "María González",
      date: "15 Mar 2024",
      readTime: "8 min",
      image: "/placeholder.svg?height=200&width=400",
      featured: true
    },
    {
      id: 2,
      title: "Hipoteca fija vs variable: ¿cuál elegir en 2024?",
      excerpt: "Analizamos las ventajas e inconvenientes de cada tipo de hipoteca para ayudarte a tomar la mejor decisión.",
      category: "Hipotecas",
      author: "Carlos Ruiz",
      date: "12 Mar 2024",
      readTime: "6 min",
      image: "/placeholder.svg?height=200&width=400"
    },
    {
      id: 3,
      title: "5 consejos para mejorar tu perfil crediticio",
      excerpt: "Descubre cómo mejorar tu historial crediticio y aumentar tus posibilidades de conseguir financiación.",
      category: "Consejos",
      author: "Ana Martín",
      date: "10 Mar 2024",
      readTime: "5 min",
      image: "/placeholder.svg?height=200&width=400"
    }
  ]

  const recentArticles = [
    {
      id: 4,
      title: "¿Cuánto ahorro necesitas para comprar una casa?",
      excerpt: "Calculamos el ahorro mínimo necesario según el precio de la vivienda y tu situación financiera.",
      category: "Ahorros",
      author: "Luis Fernández",
      date: "8 Mar 2024",
      readTime: "7 min",
      icon: PiggyBank
    },
    {
      id: 5,
      title: "Préstamos personales: tipos y cuál elegir",
      excerpt: "Comparamos los diferentes tipos de préstamos personales disponibles en el mercado español.",
      category: "Préstamos",
      author: "Isabel López",
      date: "5 Mar 2024",
      readTime: "6 min",
      icon: CreditCard
    },
    {
      id: 6,
      title: "Cómo negociar las condiciones de tu hipoteca",
      excerpt: "Estrategias efectivas para conseguir mejores condiciones en tu hipoteca actual o nueva.",
      category: "Hipotecas",
      author: "Pedro Sánchez",
      date: "3 Mar 2024",
      readTime: "9 min",
      icon: Home
    },
    {
      id: 7,
      title: "Gastos de compraventa: todo lo que debes saber",
      excerpt: "Desglose completo de todos los gastos asociados a la compra de una vivienda en España.",
      category: "Consejos",
      author: "Carmen Díaz",
      date: "1 Mar 2024",
      readTime: "8 min",
      icon: Calculator
    },
    {
      id: 8,
      title: "Seguros obligatorios para tu hipoteca",
      excerpt: "Qué seguros son obligatorios y cuáles opcionales al contratar una hipoteca.",
      category: "Seguros",
      author: "Miguel Torres",
      date: "28 Feb 2024",
      readTime: "5 min",
      icon: Shield
    },
    {
      id: 9,
      title: "Reunificación de deudas: ventajas y desventajas",
      excerpt: "Analizamos cuándo es conveniente reunificar deudas y qué aspectos considerar.",
      category: "Préstamos",
      author: "Elena Jiménez",
      date: "25 Feb 2024",
      readTime: "7 min",
      icon: FileText
    }
  ]

  const categories = [
    { name: "Hipotecas", count: 12, color: "bg-blue-100 text-blue-800" },
    { name: "Préstamos", count: 8, color: "bg-green-100 text-green-800" },
    { name: "Consejos", count: 15, color: "bg-purple-100 text-purple-800" },
    { name: "Ahorros", count: 6, color: "bg-orange-100 text-orange-800" },
    { name: "Seguros", count: 4, color: "bg-red-100 text-red-800" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mr-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Link>
              <span className="text-2xl font-bold text-gray-900 font-sans">Credovia</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/hipotecas" className="text-gray-700 hover:text-gray-900">Hipotecas</Link>
              <Link href="/prestamos" className="text-gray-700 hover:text-gray-900">Préstamos</Link>
              <Link href="/blog" className="text-blue-600 font-medium">Blog</Link>
              <Link href="/#contacto" className="text-gray-700 hover:text-gray-900">Contacto</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog financiero
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Consejos, guías y análisis para tomar las mejores decisiones financieras. Todo lo que necesitas saber sobre hipotecas, préstamos y finanzas personales.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículo destacado</h2>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Imagen del artículo</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6">
                    <Badge className="mb-3 bg-blue-100 text-blue-800">
                      {featuredArticles[0].category}
                    </Badge>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {featuredArticles[0].title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {featuredArticles[0].excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <User className="h-4 w-4 mr-1" />
                      <span className="mr-4">{featuredArticles[0].author}</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">{featuredArticles[0].date}</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{featuredArticles[0].readTime}</span>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Leer artículo completo
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Articles */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos recientes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredArticles.slice(1).map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Imagen del artículo</span>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <User className="h-3 w-3 mr-1" />
                        <span className="mr-3">{article.author}</span>
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{article.date}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Leer más
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Articles */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Todos los artículos</h2>
              <div className="space-y-6">
                {recentArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <article.icon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={`text-xs ${
                              article.category === 'Hipotecas' ? 'bg-blue-100 text-blue-800' :
                              article.category === 'Préstamos' ? 'bg-green-100 text-green-800' :
                              article.category === 'Consejos' ? 'bg-purple-100 text-purple-800' :
                              article.category === 'Ahorros' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {article.category}
                            </Badge>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {article.readTime}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 mb-3">{article.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <User className="h-3 w-3 mr-1" />
                              <span className="mr-3">{article.author}</span>
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{article.date}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                              Leer más →
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Categorías</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <span className="text-gray-700">{category.name}</span>
                      <Badge className={`text-xs ${category.color}`}>
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Más leídos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    <h4 className="font-medium text-gray-900 mb-1">
                      ¿Cuánto puedo pedir de hipoteca?
                    </h4>
                    <p className="text-gray-600 text-xs">Calculadora y factores clave</p>
                  </div>
                  <div className="text-sm">
                    <h4 className="font-medium text-gray-900 mb-1">
                      Errores comunes al pedir un préstamo
                    </h4>
                    <p className="text-gray-600 text-xs">Evita estos 7 errores frecuentes</p>
                  </div>
                  <div className="text-sm">
                    <h4 className="font-medium text-gray-900 mb-1">
                      Subrogación de hipoteca: guía paso a paso
                    </h4>
                    <p className="text-gray-600 text-xs">Cómo cambiar de banco</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Recibe los mejores consejos financieros directamente en tu email.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-sm">
                    Suscribirse
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}