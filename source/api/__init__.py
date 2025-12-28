from .transactions import bp as transactions_bp

def register_blueprints(app):
    app.register_blueprint(transactions_bp)