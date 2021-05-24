import { Grid } from "@material-ui/core";
import React, { Component, ErrorInfo, ReactNode } from "react";
import errorImage from "../../Assets/hoff.png";

interface Props {
    children: ReactNode;
}

interface State {
    error?: Error | null,
    errorInfo?: ErrorInfo | null,
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        error: null,
        errorInfo: null,
    };

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    public render() {
        if (this.state.errorInfo) {
            return (
                <Grid justify="space-around" container >
                    <Grid >
                        <h1>Sorry.. there was an error</h1>
                        <img src={errorImage} alt={"error"} />
                        <details style={{ whiteSpace: 'pre-wrap' }}>
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo?.componentStack}
                        </details>
                    </Grid>
                </Grid>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;