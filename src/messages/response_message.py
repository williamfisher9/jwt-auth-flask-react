from ..models.user import User

class ResponseMessage():
    def __init__(self, message, status):
        self.message = message
        self.status = status

    def create_response(self):
        if isinstance(self.message, User):
            return {
                "message": self.message.to_dict(),
                "status": self.status
            }

        if isinstance(self.message, str):
            return {
                "message": self.message,
                "status": self.status
            }

        if isinstance(self.message, list):
            return {
                "message": [item.to_dict() for item in self.message],
                "status": self.status
            }