from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app, origins="http://localhost:3000") 
DATABASE = 'database.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Generic: Create table
def create_table(table_name):
    conn = get_db_connection()
    conn.execute(f'''
        CREATE TABLE IF NOT EXISTS {table_name} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Generic: Insert
def insert_record(table_name, name):
    conn = get_db_connection()
    conn.execute(f'INSERT INTO {table_name} (name) VALUES (?)', (name,))
    conn.commit()
    conn.close()

# Generic: Get all
def get_records(table_name):
    conn = get_db_connection()
    rows = conn.execute(f'SELECT * FROM {table_name}').fetchall()
    conn.close()
    return [dict(row) for row in rows]

# Generic: Update
def update_record(table_name, id, name):
    conn = get_db_connection()
    conn.execute(f'UPDATE {table_name} SET name = ? WHERE id = ?', (name, id))
    conn.commit()
    conn.close()

# Generic: Delete
def delete_record(table_name, id):
    conn = get_db_connection()
    conn.execute(f'DELETE FROM {table_name} WHERE id = ?', (id,))
    conn.commit()
    conn.close()

# Create APIs dynamically
TABLES = [
    'country', 'state', 'city', 'area', 'department', 'designation',
    'employee', 'employee_list', 'ledger', 'ledger_list', 'ledger_group',
    'unit', 'tax', 'hsnsac', 'process', 'route', 'item_group', 'item',
    'item_list', 'services', 'expense_group', 'lead_through', 'purpose',
    'project', 'task_group', 'task_type', 'bank', 'user_group', 'user',
    'terms', 'terms_type', 'branch'
]

# Initialize all tables
for table in TABLES:
    create_table(table)

# Create generic routes
@app.route('/<table_name>', methods=['POST'])
def create_entry(table_name):
    if table_name not in TABLES:
        return jsonify({'error': 'Invalid table'}), 400
    name = request.json['name']
    insert_record(table_name, name)
    return jsonify({'message': f'{table_name} created successfully'})

@app.route('/<table_name>', methods=['GET'])
def get_entries(table_name):
    if table_name not in TABLES:
        return jsonify({'error': 'Invalid table'}), 400
    return jsonify(get_records(table_name))

@app.route('/<table_name>/<int:id>', methods=['PUT'])
def update_entry(table_name, id):
    if table_name not in TABLES:
        return jsonify({'error': 'Invalid table'}), 400
    name = request.json['name']
    update_record(table_name, id, name)
    return jsonify({'message': f'{table_name} updated successfully'})

@app.route('/<table_name>/<int:id>', methods=['DELETE'])
def delete_entry(table_name, id):
    if table_name not in TABLES:
        return jsonify({'error': 'Invalid table'}), 400
    delete_record(table_name, id)
    return jsonify({'message': f'{table_name} deleted successfully'})

if __name__ == "__main__":
    app.run(debug=True)
