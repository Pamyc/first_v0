"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Bot,
  User,
  Edit3,
  ArrowRight,
  UserCheck,
  ImageIcon,
  FileText,
  CheckSquare,
  Clock,
  Upload,
  Search,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

interface CRMEvent {
  id: number
  type:
    | "call_incoming"
    | "call_outgoing"
    | "call_missed"
    | "field_change"
    | "stage_change"
    | "responsible_change"
    | "whatsapp_image"
    | "note"
    | "task"
  title: string
  description: string
  timestamp: Date
  user: string
  details?: {
    phone?: string
    duration?: string
    oldValue?: string
    newValue?: string
    field?: string
    stage?: string
    responsible?: string
  }
}

export default function Home() {
  const [text, setText] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<CRMEvent | null>(null)
  const [addEventData, setAddEventData] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [eventFilter, setEventFilter] = useState("all")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Привет! Я готов помочь вам с анализом событий сделки. Выберите готовый промпт или напишите свой запрос.",
      isUser: false,
      timestamp: new Date(),
    },
  ])

  const prompts = ["Проанализируй активность по сделке", "Составь отчет по звонкам", "Покажи изменения в сделке"]

  const crmEvents: CRMEvent[] = [
    {
      id: 1,
      type: "call_outgoing",
      title: "Исходящий звонок",
      description:
        "ЦОЛ ЦОЛ заявка ГЦК РнД аэропорт Имя: ольга Телефон: 79896193498 жк полет с ремонтом 1 комн интересны цены акции",
      timestamp: new Date("2024-04-10T13:11:19"),
      user: "Центр обработки лидов",
      details: {
        phone: "79896193498",
        duration: "5 мин",
      },
    },
    {
      id: 2,
      type: "call_incoming",
      title: "Входящий звонок",
      description: "Звонок от клиента по поводу квартиры",
      timestamp: new Date("2024-04-10T12:30:00"),
      user: "Петров А.С.",
      details: {
        phone: "79896193498",
        duration: "3 мин",
      },
    },
    {
      id: 3,
      type: "call_missed",
      title: "Пропущенный звонок",
      description: "пропущенный звонок от 2024-04-10 19:06:35, перезвонить",
      timestamp: new Date("2024-04-10T19:06:35"),
      user: "Система",
      details: {
        phone: "79896193498",
      },
    },
    {
      id: 4,
      type: "task",
      title: "Задача/заметка",
      description: "Подготовить коммерческое предложение для клиента",
      timestamp: new Date("2024-04-10T10:00:00"),
      user: "Сидоров В.П.",
    },
    {
      id: 5,
      type: "field_change",
      title: "Обновление поля «Регион обращения (полный)»",
      description: "«» → «Ростов-на-Дону»",
      timestamp: new Date("2024-04-10T09:30:00"),
      user: "Система",
      details: {
        field: "Регион обращения (полный)",
        oldValue: "",
        newValue: "Ростов-на-Дону",
      },
    },
    {
      id: 6,
      type: "field_change",
      title: "Обновление поля «yclid»",
      description: "«» → «17305131177491300351»",
      timestamp: new Date("2024-04-10T09:25:00"),
      user: "Система",
      details: {
        field: "yclid",
        oldValue: "",
        newValue: "17305131177491300351",
      },
    },
    {
      id: 7,
      type: "field_change",
      title: "Обновление поля «ClientID»",
      description: "«» → «17305131177491300351»",
      timestamp: new Date("2024-04-10T09:20:00"),
      user: "Система",
      details: {
        field: "ClientID",
        oldValue: "",
        newValue: "17305131177491300351",
      },
    },
    {
      id: 8,
      type: "field_change",
      title: "Обновление поля «ym_uid»",
      description: "«» → «17004960657258811577»",
      timestamp: new Date("2024-04-10T09:15:00"),
      user: "Система",
      details: {
        field: "ym_uid",
        oldValue: "",
        newValue: "17004960657258811577",
      },
    },
  ]

  const getEventIcon = (type: CRMEvent["type"]) => {
    switch (type) {
      case "call_incoming":
        return <PhoneIncoming className="w-4 h-4" />
      case "call_outgoing":
        return <PhoneOutgoing className="w-4 h-4" />
      case "call_missed":
        return <PhoneMissed className="w-4 h-4" />
      case "field_change":
        return <Edit3 className="w-4 h-4" />
      case "stage_change":
        return <ArrowRight className="w-4 h-4" />
      case "responsible_change":
        return <UserCheck className="w-4 h-4" />
      case "whatsapp_image":
        return <ImageIcon className="w-4 h-4" />
      case "note":
        return <FileText className="w-4 h-4" />
      case "task":
        return <CheckSquare className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getEventColor = (type: CRMEvent["type"]) => {
    switch (type) {
      case "call_incoming":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "call_outgoing":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "call_missed":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      case "field_change":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20"
      case "stage_change":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20"
      case "responsible_change":
        return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20"
      case "whatsapp_image":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
      case "note":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "task":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const filteredEvents = crmEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = eventFilter === "all" || event.type.includes(eventFilter)
    return matchesSearch && matchesFilter
  })

  const handlePromptClick = (prompt: string) => {
    setText(prompt)
  }

  const handleSend = () => {
    if (text.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: text.trim(),
        isUser: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setText("")

      setTimeout(() => {
        const aiMessage: Message = {
          id: messages.length + 2,
          text: `Анализирую события по сделке ${addEventData ? "с учетом данных событий" : ""}... Вижу активную работу с клиентом: ${filteredEvents.length} событий, включая звонки, изменения полей. ${selectedEvent ? `Особое внимание к событию: ${selectedEvent.title}` : ""} Это демонстрационный ответ от ИИ-помощника для работы с AmoCRM.`,
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-sm text-muted-foreground">ID сделки</div>
                <div className="text-xl font-semibold">31032038</div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Загрузить из API</Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Распознать изображения</div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Обработка... 3</span>
                </div>
                <div className="text-xs text-muted-foreground">Осталось: 3</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Транскрибировать аудио</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Загрузить
                </Button>
                <span className="text-sm">5</span>
              </div>
              <div className="text-xs text-muted-foreground">Осталось: 20</div>
            </div>

            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="call">Звонки</SelectItem>
                  <SelectItem value="field">Поля</SelectItem>
                  <SelectItem value="task">Задачи</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="текст, телефон, автор, ID..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select defaultValue="oldest">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oldest">Сначала старые</SelectItem>
                  <SelectItem value="newest">Сначала новые</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Справочники: пользователей — 545, воронок — 58, статусов — 733
            <br />
            Загружено событий: 193 • Изображений распознано 1/4 🔥 • Аудио распознано 0/25 (не удалось загрузить: 5)
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-200px)]">
        {/* Events Timeline */}
        <div className="w-96 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              События ({filteredEvents.length})
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className={`p-4 border-b border-border cursor-pointer hover:bg-accent/50 transition-colors ${
                  selectedEvent?.id === event.id ? "bg-accent" : ""
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{index + 1}/193</span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0 ${getEventColor(event.type)}`}
                  >
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {event.type === "call_incoming" && (
                        <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                          Исходящий звонок
                        </Badge>
                      )}
                      {event.type === "call_missed" && (
                        <Badge variant="secondary" className="bg-red-500/10 text-red-600">
                          Входящий звонок (Пропущенный звонок)
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-foreground mb-2 line-clamp-3">{event.description}</p>
                    <div className="text-xs text-muted-foreground">
                      {event.timestamp.toLocaleDateString("ru-RU")}{" "}
                      {event.timestamp.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-4 ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isUser ? "bg-primary" : "bg-secondary"
                      }`}
                    >
                      {message.isUser ? (
                        <User className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <Bot className="w-4 h-4 text-secondary-foreground" />
                      )}
                    </div>
                    <Card className={`p-4 ${message.isUser ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs mt-2 opacity-70">{message.timestamp.toLocaleTimeString()}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Ваш запрос к нейросети по текущим событиям:</div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {prompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePromptClick(prompt)}
                      className="text-xs h-8 px-3"
                    >
                      Промт {index + 1}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Textarea
                    placeholder="привет"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="min-h-[80px] max-h-[200px] resize-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button onClick={handleSend} disabled={!text.trim()} className="bg-blue-600 hover:bg-blue-700">
                    Отправить
                  </Button>
                  <Button variant="outline" onClick={() => setText("")}>
                    Сбросить
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="add-data"
                    checked={addEventData}
                    onCheckedChange={(checked) => setAddEventData(checked as boolean)}
                  />
                  <label htmlFor="add-data" className="text-sm text-muted-foreground">
                    Добавить данные событий
                  </label>
                </div>
                <div className="text-xs text-muted-foreground">Будет отправлен только ваш вопрос (всего 6 слов)</div>
                <Button variant="ghost" size="sm" className="ml-auto">
                  Json
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details Sidebar */}
        {selectedEvent && (
          <div className="w-80 border-l border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Детали события</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
                ×
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Событие</div>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border ${getEventColor(selectedEvent.type)}`}
                  >
                    {getEventIcon(selectedEvent.type)}
                  </div>
                  <span className="text-sm">{selectedEvent.title}</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">ID</div>
                <div className="text-sm mt-1">310083532</div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">Автор</div>
                <div className="text-sm mt-1">{selectedEvent.user}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">Время</div>
                <div className="text-sm mt-1">
                  {selectedEvent.timestamp.toLocaleDateString("ru-RU")} г.,{" "}
                  {selectedEvent.timestamp.toLocaleTimeString("ru-RU")} (537 дней назад)
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">Текст</div>
                <div className="text-sm mt-1 p-2 bg-muted rounded">
                  {selectedEvent.description}
                  {selectedEvent.details?.phone && (
                    <div className="mt-2">
                      <div>Имя: ольга</div>
                      <div>Телефон: {selectedEvent.details.phone}</div>
                      <div>жк полет с ремонтом</div>
                      <div>1 комн</div>
                      <div>интересны цены акции</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <ChevronLeft className="w-4 h-4" />
                    Предыдущее
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    Следующее
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
