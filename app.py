from flask import Flask, render_template, request, redirect, url_for, session, flash, Response
import sqlite3
import csv
import io

app = Flask(__name__)
app.secret_key = "smart_inventory_management_system_0103"

@app.route("/")
def home():
    return render_template("login.html")


@app.route("/dashboard")
def dashboard():

    if "user" not in session:
        return redirect(url_for("home"))

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM products")
    total_products = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM products WHERE quantity < 10")
    low_stock = cursor.fetchone()[0]

    cursor.execute("SELECT SUM(price * quantity) FROM products")
    total_value = cursor.fetchone()[0]

    if total_value is None:
        total_value = 0

    conn.close()

    return render_template(
        "dashboard.html",
        total_products=total_products,
        low_stock=low_stock,
        total_value=total_value
    )

@app.route("/products")
def products():

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    search = request.args.get("search")
    status = request.args.get("status")
    category = request.args.get("category")

    query = "SELECT * FROM products WHERE 1=1"
    params = []

    if search:
        query += " AND product_name LIKE ?"
        params.append("%" + search + "%")

    if status:
        query += " AND status = ?"
        params.append(status)
    
    if category:
        query += " AND category = ?"
        params.append(category)

    print("Category:", category)
    print("Query:", query)
    print("Params:", params)

    cursor.execute(query, params)

    products = cursor.fetchall()

    product_count = len(products)

    conn.close()

    return render_template(
        "products.html",
        products=products,
        product_count=product_count
    )

@app.route("/add-product", methods=["GET", "POST"])
def add_product():

    if request.method == "POST":

        product_name = request.form.get("product_name")
        category = request.form.get("category")
        price = request.form.get("price")
        quantity = request.form.get("quantity")
        supplier = request.form.get("supplier")
        sku = request.form.get("sku")
        description = request.form.get("description")
        status = request.form.get("status")
        print("Status:", status)

        conn = sqlite3.connect("database.db")
        
        cursor = conn.cursor()

        cursor.execute("""
        INSERT INTO products
        (product_name, category, price, quantity, supplier, sku, description, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            product_name,
            category,
            price,
            quantity,
            supplier,
            sku,
            description,
            status
        ))
        
        conn.commit()
        conn.close()

        flash("Product Added Successfully!", "success")

        return redirect(url_for("products"))

    return render_template("add_product.html")


@app.route("/inventory")
def inventory():

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    # Total Products
    cursor.execute("SELECT COUNT(*) FROM products")
    total_products = cursor.fetchone()[0]

    # Total Stock
    cursor.execute("SELECT SUM(quantity) FROM products")
    total_stock = cursor.fetchone()[0]

    if total_stock is None:
        total_stock = 0

    # Low Stock
    cursor.execute("SELECT COUNT(*) FROM products WHERE quantity < 10")
    low_stock = cursor.fetchone()[0]

    # Inventory Value
    cursor.execute("SELECT SUM(price * quantity) FROM products")
    inventory_value = cursor.fetchone()[0]

    if inventory_value is None:
        inventory_value = 0

    # Products List
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()

    conn.close()

    return render_template(
        "inventory.html",
        total_products=total_products,
        total_stock=total_stock,
        low_stock=low_stock,
        inventory_value=inventory_value,
        products=products
    )
@app.route("/login", methods=["POST"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")

    if username == "admin" and password == "admin123":
        session["user"] = username
        return redirect(url_for("dashboard"))

    return "Invalid username or password"

@app.route("/logout")
def logout():

    session.pop("user", None)

    return redirect(url_for("home"))

@app.route("/edit-product/<int:product_id>")
def edit_product(product_id):

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM products WHERE id=?", (product_id,))
    product = cursor.fetchone()

    conn.close()

    return render_template("edit_product.html", product=product)

@app.route("/update-product/<int:product_id>", methods=["POST"])
def update_product(product_id):

    product_name = request.form.get("product_name")
    category = request.form.get("category")
    price = request.form.get("price")
    quantity = request.form.get("quantity")
    supplier = request.form.get("supplier")
    sku = request.form.get("sku")
    description = request.form.get("description")
    status = request.form.get("status")

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("""
    UPDATE products
    SET
        product_name = ?,
        category = ?,
        price = ?,
        quantity = ?,
        supplier = ?,
        sku = ?,
        description = ?,
        status = ?
    WHERE id = ?
    """, (
        product_name,
        category,
        price,
        quantity,
        supplier,
        sku,
        description,
        status,
        product_id
    ))

    conn.commit()
    conn.close()

    flash("Product Updated Successfully!", "success")

    return redirect(url_for("products"))

@app.route("/delete-product/<int:product_id>")
def delete_product(product_id):

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("DELETE FROM products WHERE id = ?", (product_id,))

    # Check if table is empty
    cursor.execute("SELECT COUNT(*) FROM products")
    count = cursor.fetchone()[0]

    if count == 0:
        cursor.execute("DELETE FROM sqlite_sequence WHERE name='products'")

    conn.commit()
    conn.close()

    flash("Product Deleted Successfully!", "success")

    return redirect(url_for("products"))

@app.route("/export-products")
def export_products():

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
        product_name,
        category,
        price,
        quantity,
        status
        FROM products
    """)

    products = cursor.fetchall()

    conn.close()

    output = io.StringIO()

    writer = csv.writer(output)

    writer.writerow([
        "Product Name",
        "Category",
        "Price",
        "Quantity",
        "Status"
    ])

    writer.writerows(products)

    response = Response(
        output.getvalue(),
        mimetype="text/csv"
    )

    response.headers["Content-Disposition"] = \
        "attachment; filename=products.csv"

    return response

if __name__ == "__main__":
    app.run(debug=True)


