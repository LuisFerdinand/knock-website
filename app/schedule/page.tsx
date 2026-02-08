// app/schedule/page.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Mail, Phone, Check, X } from "lucide-react";

// Mock data for booked slots
const mockBookedSlots = [
  { id: 1, date: new Date(2023, 11, 5), startTime: "09:00", endTime: "10:00", client: "John Doe", service: "Interior Design" },
  { id: 2, date: new Date(2023, 11, 5), startTime: "14:00", endTime: "15:30", client: "Jane Smith", service: "Architecture" },
  { id: 3, date: new Date(2023, 11, 6), startTime: "11:00", endTime: "12:00", client: "Bob Johnson", service: "Space Planning" },
  { id: 4, date: new Date(2023, 11, 7), startTime: "13:00", endTime: "14:30", client: "Alice Brown", service: "3D Visualization" },
  { id: 5, date: new Date(2023, 11, 12), startTime: "10:00", endTime: "11:00", client: "Charlie Davis", service: "Interior Design" },
  { id: 6, date: new Date(2023, 11, 15), startTime: "15:00", endTime: "16:30", client: "Eva Wilson", service: "Architecture" },
];

// Generate time slots from 8:00 AM to 6:00 PM with 30-minute intervals
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  return slots;
};

export default function SchedulePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Interior Design",
    message: ""
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Navigate to previous week
  const prevWeek = () => {
    const newDate = new Date(currentMonth);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentMonth(newDate);
  };

  // Navigate to next week
  const nextWeek = () => {
    const newDate = new Date(currentMonth);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentMonth(newDate);
  };

  // Check if a date has booked slots
  const hasBookedSlots = (date: Date) => {
    return mockBookedSlots.some(slot => 
      slot.date.getDate() === date.getDate() &&
      slot.date.getMonth() === date.getMonth() &&
      slot.date.getFullYear() === date.getFullYear()
    );
  };

  // Get booked slots for a specific date
  const getBookedSlotsForDate = (date: Date) => {
    return mockBookedSlots.filter(slot => 
      slot.date.getDate() === date.getDate() &&
      slot.date.getMonth() === date.getMonth() &&
      slot.date.getFullYear() === date.getFullYear()
    );
  };

  // Check if a time slot is booked
  const isTimeSlotBooked = (date: Date, time: string) => {
    const bookedSlots = getBookedSlotsForDate(date);
    return bookedSlots.some(slot => {
      const [slotHour, slotMin] = slot.startTime.split(':').map(Number);
      const [slotEndHour, slotEndMin] = slot.endTime.split(':').map(Number);
      const [timeHour, timeMin] = time.split(':').map(Number);
      
      const slotTimeInMinutes = slotHour * 60 + slotMin;
      const slotEndTimeInMinutes = slotEndHour * 60 + slotEndMin;
      const timeInMinutes = timeHour * 60 + timeMin;
      
      return timeInMinutes >= slotTimeInMinutes && timeInMinutes < slotEndTimeInMinutes;
    });
  };

  // Handle time slot selection
  const handleTimeSlotClick = (time: string) => {
    if (isTimeSlotBooked(selectedDate!, time)) return;
    
    if (selectedTimeSlots.includes(time)) {
      setSelectedTimeSlots(selectedTimeSlots.filter(slot => slot !== time));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, time]);
    }
  };

  // Handle booking submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log("Booking submitted:", {
      date: selectedDate,
      timeSlots: selectedTimeSlots,
      ...bookingData
    });
    setBookingConfirmed(true);
    setIsBooking(false);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get week dates
  const getWeekDates = () => {
    const week = [];
    const startOfWeek = new Date(currentMonth);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
  };

  // Render calendar view
  const renderCalendarView = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-card-foreground">{monthName}</h2>
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-card-foreground" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-card-foreground" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2"></div>
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
            const isToday = 
              date.getDate() === new Date().getDate() &&
              date.getMonth() === new Date().getMonth() &&
              date.getFullYear() === new Date().getFullYear();
            const hasBookings = hasBookedSlots(date);
            
            return (
              <button
                key={i}
                onClick={() => {
                  setSelectedDate(date);
                  setViewMode('week');
                }}
                className={`p-2 rounded-lg transition-colors relative ${
                  isToday ? 'bg-ring text-white' : 'hover:bg-muted'
                } ${selectedDate && 
                  date.getDate() === selectedDate.getDate() &&
                  date.getMonth() === selectedDate.getMonth() &&
                  date.getFullYear() === selectedDate.getFullYear() ? 'ring-2 ring-ring' : ''
                }`}
              >
                <span className="block text-sm font-medium">{i + 1}</span>
                {hasBookings && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const weekDates = getWeekDates();
    const timeSlots = generateTimeSlots();
    
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            {selectedDate ? formatDate(selectedDate) : "Select a date"}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={prevWeek}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-card-foreground" />
            </button>
            <button
              onClick={nextWeek}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-card-foreground" />
            </button>
          </div>
        </div>
        
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {weekDates.map((date, i) => {
            const isToday = 
              date.getDate() === new Date().getDate() &&
              date.getMonth() === new Date().getMonth() &&
              date.getFullYear() === new Date().getFullYear();
            const isSelected = selectedDate && 
              date.getDate() === selectedDate.getDate() &&
              date.getMonth() === selectedDate.getMonth() &&
              date.getFullYear() === selectedDate.getFullYear();
            
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center p-3 rounded-lg min-w-[80px] transition-colors ${
                  isSelected ? 'bg-ring text-white' : isToday ? 'bg-muted' : 'hover:bg-muted'
                }`}
              >
                <span className="text-xs font-medium mb-1">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="text-lg font-bold">{date.getDate()}</span>
                <span className="text-xs">
                  {date.toLocaleDateString('en-US', { month: 'short' })}
                </span>
              </button>
            );
          })}
        </div>
        
        {selectedDate && (
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-[80px_1fr] gap-2 mb-2">
                <div className="text-sm font-medium text-muted-foreground p-2">Time</div>
                <div className="text-sm font-medium text-muted-foreground p-2">Availability</div>
              </div>
              
              {timeSlots.map(time => {
                const isBooked = isTimeSlotBooked(selectedDate, time);
                const isSelected = selectedTimeSlots.includes(time);
                const bookedSlot = getBookedSlotsForDate(selectedDate).find(slot => {
                  const [slotHour, slotMin] = slot.startTime.split(':').map(Number);
                  const [timeHour, timeMin] = time.split(':').map(Number);
                  return slotHour === timeHour && slotMin === timeMin;
                });
                
                return (
                  <div key={time} className="grid grid-cols-[80px_1fr] gap-2 mb-2">
                    <div className="text-sm p-2 font-medium text-muted-foreground">{time}</div>
                    <button
                      onClick={() => handleTimeSlotClick(time)}
                      disabled={isBooked}
                      className={`p-2 rounded-lg text-left transition-colors ${
                        isBooked 
                          ? 'bg-red-50 text-red-700 border border-red-200 cursor-not-allowed' 
                          : isSelected 
                            ? 'bg-ring text-white' 
                            : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {isBooked ? (
                        <div>
                          <div className="font-medium">Booked</div>
                          <div className="text-xs">{bookedSlot?.client} - {bookedSlot?.service}</div>
                        </div>
                      ) : (
                        <div className="font-medium">Available</div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {selectedDate && selectedTimeSlots.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsBooking(true)}
              className="px-6 py-2 bg-ring text-white rounded-lg hover:bg-ring/90 transition-colors"
            >
              Book Selected Slots
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isClient && (
        <div className="min-h-screen bg-background transition-colors duration-300 pt-16">
          {/* Main Content */}
          <main className="container-custom py-12">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Schedule a Consultation
                </h1>
                <p className="text-lg text-muted-foreground">
                  Select a date and time that works for you, and we'll get in touch to confirm your consultation.
                </p>
              </div>

              {/* View Toggle */}
              <div className="mb-6 flex justify-center">
                <div className="inline-flex rounded-lg border border-border p-1 bg-muted">
                  <button
                    onClick={() => setViewMode('month')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      viewMode === 'month' 
                        ? 'bg-background text-foreground shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Month View
                  </button>
                  <button
                    onClick={() => setViewMode('week')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      viewMode === 'week' 
                        ? 'bg-background text-foreground shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Week View
                  </button>
                </div>
              </div>

              {viewMode === 'month' ? renderCalendarView() : renderWeekView()}
            </div>
          </main>

          {/* Booking Modal */}
          {isBooking && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-card-foreground">Book Your Consultation</h2>
                  <button
                    onClick={() => setIsBooking(false)}
                    className="p-1 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="h-5 w-5 text-card-foreground" />
                  </button>
                </div>

                {bookingConfirmed ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2">Booking Confirmed!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your consultation has been scheduled for {formatDate(selectedDate!)} from {selectedTimeSlots[0]} to {selectedTimeSlots[selectedTimeSlots.length - 1]}.
                    </p>
                    <button
                      onClick={() => {
                        setBookingConfirmed(false);
                        setSelectedTimeSlots([]);
                        setBookingData({
                          name: "",
                          email: "",
                          phone: "",
                          service: "Interior Design",
                          message: ""
                        });
                      }}
                      className="px-6 py-2 bg-ring text-white rounded-lg hover:bg-ring/90 transition-colors"
                    >
                      Book Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Date & Time
                      </label>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="font-medium">{formatDate(selectedDate!)}</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedTimeSlots.length > 1 
                            ? `From ${selectedTimeSlots[0]} to ${selectedTimeSlots[selectedTimeSlots.length - 1]}`
                            : selectedTimeSlots[0]
                          }
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          id="name"
                          type="text"
                          required
                          value={bookingData.name}
                          onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          id="email"
                          type="email"
                          required
                          value={bookingData.email}
                          onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          id="phone"
                          type="tel"
                          required
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="service" className="block text-sm font-medium text-card-foreground mb-2">
                        Service Interest
                      </label>
                      <select
                        id="service"
                        value={bookingData.service}
                        onChange={(e) => setBookingData({...bookingData, service: e.target.value})}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="Interior Design">Interior Design</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Space Planning">Space Planning</option>
                        <option value="3D Visualization">3D Visualization</option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                        Additional Information (Optional)
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        value={bookingData.message}
                        onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setIsBooking(false)}
                        className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-card-foreground hover:bg-muted transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-ring text-white rounded-lg hover:bg-ring/90 transition-colors"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}