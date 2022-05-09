#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks

out vec4 FragColor;

void main() {
    vec3 final = ambient * material_color + diffuse * material_color + specular * material_specular;
    if(final.x > 1.0)
    {
        final.x = 1.0;
    }
    if(final.y > 1.0)
    {
        final.y = 1.0;
    }
    if(final.z > 1.0)
    {
        final.z = 1.0;
    }
    FragColor = vec4(final, 1.0);
}
