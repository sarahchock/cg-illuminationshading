#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform float material_shininess; // n
uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;

void main() {
    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);
    ambient = light_ambient;
    normalize(vertex_normal);
    vec3 L_vector = normalize(light_position - vertex_position);
    float N_dot_L = dot(vertex_normal, L_vector);
    if(N_dot_L < 0.0)
    {
        N_dot_L = 0.0;
    }
    diffuse = light_color * N_dot_L;
    vec3 V_vector = normalize(camera_position - vertex_position);
    vec3 reflection = normalize(reflect(L_vector, vertex_normal)); //L might need to be negative
    float R_dot_V = dot(reflection, V_vector);
    if(R_dot_V < 0.0)
    {
        R_dot_V = 0.0;
    }
    specular = light_color * pow(R_dot_V, material_shininess);

}
