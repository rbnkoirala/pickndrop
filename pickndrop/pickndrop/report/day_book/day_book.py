import frappe

from collections import defaultdict

import json




def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)

    report_summary = calculate_and_format_summary(filters, data)

    return columns, data, None, None, report_summary


def get_data(filters):
    from_date = frappe.utils.getdate(filters.get("from_date"))
    to_date = frappe.utils.getdate(filters.get("to_date"))
    company = filters.get("company")
    account = filters.get("account")


    account_opening_balance = frappe.get_value("GL Entry", filters={"posting_date": ["<", from_date], "company": company, "account": ["=", account]}, fieldname="sum(debit) - sum(credit)")
    account_opening_balance = account_opening_balance or 0

    data = frappe.get_all("GL Entry", filters={"posting_date": ["between", [from_date, to_date]], "account": account, "company": company}, fields=["fiscal_year", "posting_date", "against", "debit", "credit"], order_by="creation")

    #add opening balance on data list at 0 index if account_opening_balance is posative in than place amount in debit else credit
    if account_opening_balance > 0:
        data.insert(0, {"fiscal_year": "", "posting_date": from_date, "against": "Opening Balance", "debit": account_opening_balance, "credit": 0})
    else:
        data.insert(0, {"fiscal_year": "", "posting_date": from_date, "against": "Opening Balance", "debit": 0, "credit": abs(account_opening_balance)})
    

    running_total = 0
    for entry in data:
        entry["running_total"] = running_total + entry["debit"] - entry["credit"]
        running_total = entry["running_total"]

    #add closing balance on data list at last index from sum of debit - sum credit amount if closing balance is posative in than place amount in debit else credit
    closing_balance = sum([entry["debit"] for entry in data]) - sum([entry["credit"] for entry in data])
    if closing_balance > 0:
        data.append({"fiscal_year": "", "posting_date": to_date, "against": "Closing Balance", "debit": closing_balance, "credit": 0, "running_total": running_total })
    else:
        data.append({"fiscal_year": "", "posting_date": to_date, "against": "Closing Balance", "debit": 0, "credit": abs(closing_balance), "running_total": running_total})
    


    return data

def get_columns():
    return [
        {
            "label": "Fiscal Year",
            "fieldname": "fiscal_year",
            "fieldtype": "Data",
            "width": 100,
        },
        {
            "label": "Posting Date",
            "fieldname": "posting_date",
            "fieldtype": "Date",
            "width": 120,
        },
        {
            "label": "Against",
            "fieldname": "against",
            "fieldtype": "Data",
            "width": 350,
        },
        {
            "label": "Debit",
            "fieldname": "debit",
            "fieldtype": "Currency",
            "width": 180,
        },
        {
            "label": "Credit",
            "fieldname": "credit",
            "fieldtype": "Currency",
            "width": 150,
        },
        {
            "label": "Running Total",
            "fieldname": "running_total",
            "fieldtype": "Currency",
            "width": 150,
        }
    ]

def calculate_and_format_summary(filters , data):
    
    from_date = filters.get("from_date")
    to_date = filters.get("to_date")

    company = filters.get("company")
    account = filters.get("account")
 
    opening_balance = frappe.get_value("GL Entry", filters={"posting_date": ["<", from_date], "company": company, "account": ["=", account]}, fieldname="sum(debit) - sum(credit)")
    opening_balance = opening_balance or 0
    
    # remove first and last entry from data list to calculate net transaction

    net_transaction = sum([entry["debit"] for entry in data[1:-1]]) - sum([entry["credit"] for entry in data[1:-1]])

    net_transaction = net_transaction or 0
    
    opening_balance_label = "Opening Balance"
    net_transaction_label = "Transaction ( Debit - Credit )"
    closing_balance_label = "Closing Balance"

    # Get the default currency for the company
    currency = frappe.db.get_value("Company", filters={"name": company}, fieldname="default_currency")

    # Calculate net profit
    closing_balance = opening_balance + net_transaction

    # Determine the indicator color based on net profit
    indicator_color = "Green" if closing_balance > 0 else "Red"

    # Create a formatted summary
    summary = [
        {"value": opening_balance, "label": opening_balance_label, "datatype": "Currency", "currency": currency},
        {"type": "separator", "value": "-"},
        {"value": net_transaction, "label": net_transaction_label, "datatype": "Currency", "currency": currency},
        {"type": "separator", "value": "=", "color": "blue"},
        {"value": closing_balance, "indicator": indicator_color, "label": closing_balance_label, "datatype": "Currency", "currency": currency},
    ]
    

    return summary

    



