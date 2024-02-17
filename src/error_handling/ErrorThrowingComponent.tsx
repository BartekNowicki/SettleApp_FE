const ErrorThrowingComponent = () => {
    throw new Error('Error thrown by the ErrorThrowingComponent!');
    return <div>Unreachable content </div>;
};
export default ErrorThrowingComponent;