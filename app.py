from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("login.html")


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


@app.route("/products")
def products():
    return render_template("products.html")


@app.route("/add-product")
def add_product():
    return render_template("add_product.html")


@app.route("/inventory")
def inventory():
    return render_template("inventory.html")

@app.route("/login", methods=["POST"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")

    if username == "admin" and password == "admin123":
        return redirect(url_for('dashboard'))
    else:
        return "Invalid username or password"
    
    return render_template('login.html')




if __name__ == "__main__":
    app.run(debug=True)