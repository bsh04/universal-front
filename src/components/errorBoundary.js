import React, {Component} from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Обновление состояния, чтобы при последующей отрисовке показать аварийный UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Вы можете прологировать ошибку с помощью сервиса отчета об ошибках
        //logErrorToMyService(error, info);
    }

    render() {
      if (this.state.hasError) {
        // Вы можете отрисовать любой резервный UI
        return (
            <div>
                <h1>Ошибка...</h1>
                <p>Пожалуйста, свяжитесь с нами ;-)</p>
            </div>
        );
      }
      return this.props.children;
    }
}

export default ErrorBoundary;