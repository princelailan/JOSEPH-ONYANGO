import math
import time
import random

def calculator():
    print("\nScientific Calculator")
    print("Operations: +, -, *, /, sin, cos, tan, log, sqrt, ^")
    print("Enter 'q' to quit")
    while True:
        expression = input("Enter expression (e.g., 2 + 3, sin(0.5), sqrt(16)): ").strip().lower()
        if expression == 'q':
            break
        try:
            # Replace mathematical functions with Python equivalents
            expression = (expression.replace('sin', 'math.sin')
                                    .replace('cos', 'math.cos')
                                    .replace('tan', 'math.tan')
                                    .replace('log', 'math.log10')
                                    .replace('sqrt', 'math.sqrt')
                                    .replace('^', '**'))
            result = eval(expression, {"__builtins__": None}, {"math": math})
            print(f"Result: {result}")
        except Exception as e:
            print(f"Error: {e}")

def weather_app():
    print("\nWeather App (Mock Data)")
    city = input("Enter city: ").strip()
    if city:
        print(f"Weather in {city}: 25°C, Sunny")
    else:
        print("Please enter a city.")

def todo_list():
    tasks = []
    print("\nTo-Do List")
    print("Commands: 'add <task>', 'delete <index>', 'list', 'q' to quit")
    while True:
        command = input("Enter command: ").strip().lower()
        if command == 'q':
            break
        elif command.startswith('add '):
            task = command[4:].strip()
            if task:
                tasks.append(task)
                print(f"Added: {task}")
            else:
                print("Task cannot be empty.")
        elif command.startswith('delete '):
            try:
                index = int(command[7:].strip()) - 1
                if 0 <= index < len(tasks):
                    removed = tasks.pop(index)
                    print(f"Deleted: {removed}")
                else:
                    print("Invalid index.")
            except ValueError:
                print("Invalid index.")
        elif command == 'list':
            if tasks:
                for i, task in enumerate(tasks, 1):
                    print(f"{i}. {task}")
            else:
                print("No tasks.")

def currency_converter():
    rates = {"USD": 1, "EUR": 0.85, "KES": 110, "GBP": 0.75}
    print("\nCurrency Converter")
    print(f"Available currencies: {', '.join(rates.keys())}")
    try:
        amount = float(input("Enter amount: "))
        if amount <= 0:
            print("Amount must be positive.")
            return
        from_currency = input("From currency: ").strip().upper()
        to_currency = input("To currency: ").strip().upper()
        if from_currency not in rates or to_currency not in rates:
            print("Invalid currency.")
            return
        converted = (amount * rates[to_currency]) / rates[from_currency]
        print(f"{amount} {from_currency} = {converted:.2f} {to_currency}")
    except ValueError:
        print("Invalid amount.")

def timer_stopwatch():
    print("\nTimer/Stopwatch")
    print("1. Stopwatch")
    print("2. Countdown")
    choice = input("Choose (1/2): ").strip()
    
    if choice == '1':
        print("Stopwatch started. Press Ctrl+C to stop.")
        start_time = time.time()
        try:
            while True:
                elapsed = int(time.time() - start_time)
                hours = elapsed // 3600
                minutes = (elapsed % 3600) // 60
                seconds = elapsed % 60
                print(f"\r{hours:02d}:{minutes:02d}:{seconds:02d}", end='')
                time.sleep(1)
        except KeyboardInterrupt:
            print("\nStopwatch stopped.")
    elif choice == '2':
        try:
            seconds = int(input("Enter countdown time (seconds): "))
            if seconds <= 0:
                print("Time must be positive.")
                return
            print("Countdown started.")
            while seconds > 0:
                hours = seconds // 3600
                minutes = (seconds % 3600) // 60
                secs = seconds % 60
                print(f"\r{hours:02d}:{minutes:02d}:{secs:02d}", end='')
                time.sleep(1)
                seconds -= 1
            print("\r00:00:00\nCountdown finished.")
        except ValueError:
            print("Invalid time.")

def unit_converter():
    units = {
        "length": {
            "meters": 1,
            "kilometers": 0.001,
            "miles": 0.000621371,
            "feet": 3.28084
        },
        "weight": {
            "kilograms": 1,
            "pounds": 2.20462,
            "ounces": 35.274
        },
        "temperature": {
            "celsius": lambda x: x,
            "fahrenheit": lambda x: (x * 9/5) + 32,
            "kelvin": lambda x: x + 273.15,
            "to_celsius": {
                "celsius": lambda x: x,
                "fahrenheit": lambda x: (x - 32) * 5/9,
                "kelvin": lambda x: x - 273.15
            }
        }
    }

    print("\nUnit Converter")
    print("Types: length, weight, temperature")
    type_ = input("Choose type: ").strip().lower()
    if type_ not in units:
        print("Invalid type.")
        return

    print(f"Available units: {', '.join(units[type_].keys()) if type_ != 'temperature' else ', '.join(['celsius', 'fahrenheit', 'kelvin'])}")
    try:
        amount = float(input("Enter amount: "))
        from_unit = input("From unit: ").strip().lower()
        to_unit = input("To unit: ").strip().lower()

        if type_ == "temperature":
            if from_unit not in units[type_]["to_celsius"] or to_unit not in units[type_]:
                print("Invalid unit.")
                return
            to_celsius = units[type_]["to_celsius"][from_unit](amount)
            converted = units[type_][to_unit](to_celsius)
        else:
            if from_unit not in units[type_] or to_unit not in units[type_]:
                print("Invalid unit.")
                return
            converted = (amount * units[type_][to_unit]) / units[type_][from_unit]

        print(f"{amount} {from_unit} = {converted:.2f} {to_unit}")
    except ValueError:
        print("Invalid amount.")

def random_number_generator():
    print("\nRandom Number Generator")
    try:
        min_val = int(input("Enter minimum: "))
        max_val = int(input("Enter maximum: "))
        if min_val >= max_val:
            print("Minimum must be less than maximum.")
            return
        number = random.randint(min_val, max_val)
        print(f"Random Number: {number}")
    except ValueError:
        print("Invalid range.")

def color_picker():
    print("\nColor Picker (Hex to RGB)")
    hex_color = input("Enter hex color (e.g., #FF0000): ").strip().lower()
    if not hex_color.startswith('#') or len(hex_color) != 7:
        print("Invalid hex color. Use format #RRGGBB.")
        return
    try:
        hex_color = hex_color[1:]
        r = int(hex_color[0:2], 16)
        g = int(hex_color[2:4], 16)
        b = int(hex_color[4:6], 16)
        print(f"HEX: #{hex_color.upper()}")
        print(f"RGB: ({r}, {g}, {b})")
    except ValueError:
        print("Invalid hex color.")

def bmi_calculator():
    print("\nBMI Calculator")
    try:
        weight = float(input("Enter weight (kg): "))
        height = float(input("Enter height (cm): ")) / 100  # Convert cm to meters
        if weight <= 0 or height <= 0:
            print("Weight and height must be positive.")
            return
        bmi = weight / (height * height)
        if bmi < 18.5:
            category = "Underweight"
        elif bmi < 25:
            category = "Normal"
        elif bmi < 30:
            category = "Overweight"
        else:
            category = "Obese"
        print(f"BMI: {bmi:.2f} ({category})")
    except ValueError:
        print("Invalid weight or height.")

def main():
    tools = {
        "1": ("Calculator", calculator),
        "2": ("Weather App", weather_app),
        "3": ("To-Do List", todo_list),
        "4": ("Currency Converter", currency_converter),
        "5": ("Timer/Stopwatch", timer_stopwatch),
        "6": ("Unit Converter", unit_converter),
        "7": ("Random Number Generator", random_number_generator),
        "8": ("Color Picker", color_picker),
        "9": ("BMI Calculator", bmi_calculator)
    }

    while True:
        print("\nTools Menu:")
        for key, (name, _) in tools.items():
            print(f"{key}. {name}")
        print("0. Exit")
        choice = input("Choose a tool (0-9): ").strip()
        if choice == '0':
            print("Goodbye!")
            break
        if choice in tools:
            tools[choice][1]()
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    main()