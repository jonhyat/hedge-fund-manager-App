const MyModule = (function() {
    // Private variables
    let privateVar = 'I am private';

    // Private method
    function privateMethod() {
        console.log('This is private');
    }

    return {
        // Public methods
        publicMethod: function() {
            console.log('This is public');
            privateMethod();
        },
        
        // Public properties
        publicProperty: 'I am public'
    };
})();

export default MyModule; 