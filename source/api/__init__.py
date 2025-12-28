from .main_workflow import bp as main_workflow_bp

def register_blueprints(app):
    app.register_blueprint(main_workflow_bp)